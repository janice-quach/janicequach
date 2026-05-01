interface Env {
  READS: AnalyticsEngineDataset
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const headers = {
    'Access-Control-Allow-Origin': 'https://janicequach.com',
    'Access-Control-Allow-Methods': 'POST',
  }

  try {
    const body = (await context.request.json()) as {
      slug?: string
      scroll?: number
      time?: number
      referrer?: string
    }
    const { slug, scroll, time, referrer } = body

    if (!slug || typeof scroll !== 'number' || typeof time !== 'number') {
      return new Response('bad', { status: 400, headers })
    }

    try {
      context.env.READS?.writeDataPoint({
        blobs: [slug, referrer || ''],
        doubles: [scroll, time],
        indexes: [slug],
      })
    } catch {
      // READS binding absent or non-functional — silently skip analytics
    }

    return new Response('ok', { status: 200, headers })
  } catch {
    return new Response('error', { status: 500, headers })
  }
}

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': 'https://janicequach.com',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  })
}
