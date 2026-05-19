// Blog is public. Pass all requests through.
export const onRequest: PagesFunction = async ({ next }) => next()
