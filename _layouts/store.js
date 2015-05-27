{% set blogposts_viewmodel = prismic.blogposts | to_blogposts_viewmodel(prismic.authors, prismic.rstblogposts, { ignoreContent: true }) %}

var techZalando = techZalando || {};

techZalando.Store = {};
techZalando.Store.blogposts = {{ JSON.stringify(blogposts_viewmodel) }};
