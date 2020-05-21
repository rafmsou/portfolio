import React from 'react';
import PropTypes from 'prop-types';
import { Heading, Text, Flex, Box } from 'rebass/styled-components';
import { StaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import FontAwesomeIcon from 'react-fontawesome';
import Section from '../components/Section';
import { CardContainer, Card } from '../components/Card';
import Triangle from '../components/Triangle';

const Background = () => (
  <div>
    <Triangle
      color="backgroundDark"
      height={['15vh', '10vh']}
      width={['100vw', '100vw']}
      invertX
    />

    <Triangle
      color="secondary"
      height={['50vh', '40vh']}
      width={['70vw', '40vw']}
      invertY
    />

    <Triangle
      color="primaryDark"
      height={['40vh', '15vh']}
      width={['100vw', '100vw']}
      invertX
      invertY
    />
  </div>
);

const EllipsisHeading = styled(Heading)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-inline-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  border-bottom: ${(props) => props.theme.colors.primary} 5px solid;
`;

const Post = ({ title, url, date }) => (
  <div style={{ padding: 10 }}>
    <Link to={url}>
      {title} ({date})
    </Link>
  </div>
);

Post.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

const Blog = () => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
          edges {
            node {
              id
              excerpt(pruneLength: 250)
              frontmatter {
                date(formatString: "MMMM DD, YYYY")
                slug
                title
              }
            }
          }
        }
      }
    `}
    render={({ allMarkdownRemark: { edges } }) => {
      const posts = edges
        .filter((edge) => !!edge.node.frontmatter.date)
        .map((edge) => edge.node);

      return (
        <Section.Container id="blog" Background={Background}>
          <Section.Header name="Blog" label="blog" />
          {posts.map((post) => (
            <Fade bottom key={post.id}>
              <Post
                key={post.id}
                title={post.frontmatter.title}
                url={post.frontmatter.slug}
                date={post.frontmatter.date}
              />
            </Fade>
          ))}
        </Section.Container>
      );
    }}
  />
);

export default Blog;
