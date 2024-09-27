export async function GET(request: Request) {
  console.log('[Healthcheck]');

  const response = {
    message: 'Healthy'
  };

  console.log(`Response: ${JSON.stringify(response)}`);
  return Response.json(response, { status: 200 });
}
