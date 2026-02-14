/**
 * Comprehensive test function to debug DigitalOcean Functions environment
 */

export async function main(event) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  try {
    // Get ALL environment variables
    const allEnvVars = {};
    for (const key in process.env) {
      // Mask sensitive values
      if (key.includes('KEY') || key.includes('SECRET') || key.includes('TOKEN')) {
        allEnvVars[key] = process.env[key] ? `[SET - length: ${process.env[key].length}]` : '[NOT SET]';
      } else {
        allEnvVars[key] = process.env[key];
      }
    }

    return {
      statusCode: 200,
      headers,
      body: {
        success: true,
        message: "Debugging environment variables",
        eventKeys: Object.keys(event),
        eventStructure: {
          http: event.http,
          userInput: event.userInput,
          hasOtherKeys: Object.keys(event).filter(k => !['http', '__ow_headers', '__ow_method', '__ow_path', 'userInput'].includes(k))
        },
        environment: {
          allVars: allEnvVars,
          totalCount: Object.keys(process.env).length,
          specificChecks: {
            OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY ? `EXISTS (${process.env.OPENROUTER_API_KEY.substring(0, 10)}...)` : 'NOT FOUND',
            MAX_DAILY_COST: process.env.MAX_DAILY_COST || 'NOT FOUND',
            NODE_ENV: process.env.NODE_ENV || 'NOT FOUND',
            __OW_API_KEY: process.env.__OW_API_KEY ? 'EXISTS' : 'NOT FOUND'
          }
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
