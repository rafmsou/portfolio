import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, Flex, Box } from 'rebass/styled-components';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import { CardContainer, Card } from '../components/Card';
import SocialLink from '../components/SocialLink';
import Triangle from '../components/Triangle';
import InfoTag from '../components/InfoTag';
import Hide from '../components/Hide';

const Background = () => (
  <div>
    <Triangle
      color="secondaryLight"
      height={['80vh', '80vh']}
      width={['100vw', '100vw']}
      invertX
    />

    <Triangle
      color="background"
      height={['50vh', '20vh']}
      width={['50vw', '50vw']}
      invertX
    />

    <Triangle
      color="primaryDark"
      height={['25vh', '40vh']}
      width={['75vw', '60vw']}
      invertX
      invertY
    />

    <Triangle
      color="backgroundDark"
      height={['25vh', '20vh']}
      width={['100vw', '100vw']}
      invertY
    />
  </div>
);

const CARD_HEIGHT = '250px';

const MEDIA_QUERY_SMALL = '@media (max-width: 400px)';

const Title = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  display: table;
  border-bottom: ${(props) => props.theme.colors.primary} 5px solid;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100%;
`;

const BottomRowContainer = styled.div`
  margin: auto;
`;

const Project = ({
  companyName,
  title,
  description,
  location,
  startedOn,
  finishedOn,
}) => (
  <Card p={0}>
    <Flex style={{ height: CARD_HEIGHT }}>
      <TextContainer>
        <span>
          <Title my={2} pb={1} color="text">
            {companyName}
          </Title>
        </span>
        <Text style={{ overflow: 'auto' }} color="text">
          {title}
        </Text>
      </TextContainer>
      <TextContainer>
        <Text
          style={{
            overflow: 'auto',
            maxHeight: 200,
          }}
          color="text"
          fontSize={12}
        >
          {description}
        </Text>
      </TextContainer>
    </Flex>
    <Flex>
      <BottomRowContainer>
        <InfoTag bg="primary" color="white" y="bottom" x="right">
          {location}
        </InfoTag>
        <InfoTag bg="backgroundDark" y="bottom" x="left">
          {`${startedOn} - ${finishedOn}`}
        </InfoTag>
      </BottomRowContainer>
    </Flex>
  </Card>
);

Project.propTypes = {
  companyName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  startedOn: PropTypes.string.isRequired,
  finishedOn: PropTypes.string.isRequired,
};

const Projects = () => (
  <Section.Container id="projects" Background={Background}>
    <Section.Header name="Projects" />
    <StaticQuery
      query={graphql`
        query LinkedInResume {
          linkedInResume {
            headline
            education {
              schoolName
              startDate
            }
            experiences {
              companyName
              title
              description
              location
              startedOn
              finishedOn
            }
          }
        }
      `}
      render={({ linkedInResume }) => (
        <CardContainer minWidth="350px">
          {linkedInResume.experiences.map((exp, i) => (
            <Fade bottom delay={i * 200} key={i}>
              <Project {...exp} />
            </Fade>
          ))}
        </CardContainer>
      )}
    />
  </Section.Container>
);

export default Projects;
