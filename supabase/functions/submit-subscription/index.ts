import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limit configuration
const RATE_LIMIT_MAX_REQUESTS = 3;
const RATE_LIMIT_WINDOW_MINUTES = 60;

// List of common disposable email domains to block
const DISPOSABLE_EMAIL_DOMAINS = [
  "tempmail.com", "throwaway.email", "guerrillamail.com", "mailinator.com",
  "10minutemail.com", "temp-mail.org", "fakeinbox.com", "trashmail.com"
];

interface SubscriptionRequest {
  firstName: string;
  lastName: string;
  email: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    // Get client IP from headers
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("cf-connecting-ip") || 
                     "unknown";

    console.log(`Subscription request from IP: ${clientIp}`);

    // Parse and validate request body
    const body: SubscriptionRequest = await req.json();
    
    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email) {
      console.log("Validation failed: Missing required fields");
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Trim and validate field lengths
    const firstName = body.firstName.trim();
    const lastName = body.lastName.trim();
    const email = body.email.trim().toLowerCase();

    if (firstName.length < 2 || firstName.length > 50) {
      return new Response(
        JSON.stringify({ error: "First name must be between 2 and 50 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (lastName.length < 2 || lastName.length > 50) {
      return new Response(
        JSON.stringify({ error: "Last name must be between 2 and 50 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 255) {
      return new Response(
        JSON.stringify({ error: "Please enter a valid email address" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check for disposable email domains
    const emailDomain = email.split("@")[1];
    if (DISPOSABLE_EMAIL_DOMAINS.includes(emailDomain)) {
      console.log(`Blocked disposable email domain: ${emailDomain}`);
      return new Response(
        JSON.stringify({ error: "Please use a permanent email address" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check rate limit
    const rateLimitWindow = new Date();
    rateLimitWindow.setMinutes(rateLimitWindow.getMinutes() - RATE_LIMIT_WINDOW_MINUTES);

    const { data: recentRequests, error: rateLimitError } = await supabase
      .from("subscription_rate_limits")
      .select("id")
      .eq("ip_address", clientIp)
      .gte("created_at", rateLimitWindow.toISOString());

    if (rateLimitError) {
      console.error("Rate limit check error:", rateLimitError);
    }

    if (recentRequests && recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
      console.log(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Record this request for rate limiting
    const { error: insertRateLimitError } = await supabase
      .from("subscription_rate_limits")
      .insert({ ip_address: clientIp });

    if (insertRateLimitError) {
      console.error("Failed to record rate limit:", insertRateLimitError);
    }

    // Clean up old rate limit records occasionally (non-blocking)
    if (Math.random() < 0.1) {
      supabase.rpc("cleanup_old_rate_limits").then(() => {
        console.log("Cleaned up old rate limit records");
      });
    }

    // Insert subscription with consent timestamp
    const { error: subscriptionError } = await supabase
      .from("subscriptions")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        consented_at: new Date().toISOString(),
      });

    if (subscriptionError) {
      console.error("Subscription insert error:", subscriptionError);
      
      // Handle duplicate email error
      if (subscriptionError.code === "23505") {
        return new Response(
          JSON.stringify({ error: "This email is already on the waitlist" }),
          { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Failed to submit subscription. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Successfully subscribed: ${email}`);

    return new Response(
      JSON.stringify({ success: true, message: "Successfully joined the waitlist" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});