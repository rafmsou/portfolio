exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const blogPostTemplate = require.resolve(`./src/templates/blogPost.js`);
  const result = await graphql(`
    query {
      allMarkdownRemark(filter: { frontmatter: { path: { ne: null } } }) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    console.log('node', node.frontmatter);
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {
        // additional data can be passed via context
        path: node.frontmatter.path,
      },
    });
  });
};