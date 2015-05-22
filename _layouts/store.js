{% set blogposts_viewmodel = prismic.blogposts | to_blogposts_viewmodel(prismic.authors, prismic.rstblogposts, { ignoreContent: true }) %}

var store = store || {};
store.blogposts = {{ JSON.stringify(blogposts_viewmodel) }};
