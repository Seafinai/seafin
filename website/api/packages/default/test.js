/**
 * Simple test function to verify DigitalOcean Functions setup
 */

export async function main(event) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  try {
    // Echo back what we received
    return {
      statusCode: 200,
      headers,
      body: {
        success: true,
        message: "Test function works!",
        receivedEvent: {
          method: event.http.method,
          path: event.http.path,
          userInput: event.userInput,
          message: event.message,
          allKeys: Object.keys(event)
        },
        envCheck: {
          hasApiKey: !!process.env.OPENROUTER_API_KEY,
          nodeEnv: process.env.NODE_ENV
        }
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: {
        error: error.message,
        stack: error.stack
      }
    };
  }
}
