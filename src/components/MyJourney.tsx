import { faBriefcase, faSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent, TimelineOppositeContent } from '@mui/lab';
import { Container, Typography, Box } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export const colorSchema = ['primary', 'secondary', 'success', 'error', 'info', 'warning'] as const;

export interface TimelineEvent {
    time?: string;
    title: string;
    description?: string;
    description_2?: string;
    description_3?: string;
    description_4?: string;
    description_5?: string;
    color?: typeof colorSchema[number];
}

export interface CustomTimelineProps {
    events: TimelineEvent[];
    position?: 'left' | 'right' | 'alternate' | 'alternate-reverse';
}

export const MyJourney = ({ events, position = 'alternate' }: CustomTimelineProps) => (
    <Box
        id="about"
        sx={{
            py: 10,
            backgroundColor: 'rgb(254, 252, 254, 0.4)',
            backdropFilter: 'blur(10px)',
        }}
    >
        <Container maxWidth="lg">
            <Timeline position={position}>
                {events.map((event, idx) => (
                    <TimelineItem key={idx}>
                        {event.time && (
                            <TimelineOppositeContent
                                fontWeight="bold"
                                color="text.primary">
                                <Typography variant="body2">{event.time}</Typography>
                            </TimelineOppositeContent>
                        )}
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot color="error">
                                <FontAwesomeIcon icon={faBriefcase} />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineSeparator>
                            <TimelineDot color={event.color || 'primary'} />
                            {idx < events.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography
                                fontWeight="bold"
                                variant="h6" component="span">
                                {event.title}
                            </Typography>
                            <List
                                sx={{ width: '100%', maxWidth: 360 }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"

                            >
                                <ListItem>
                                    <Typography variant="body2">
                                        <FontAwesomeIcon icon={faSquare} />{event.description}
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography variant="body2">
                                        <FontAwesomeIcon icon={faSquare} />
                                        {event.description_2}</Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography variant="body2">
                                        <FontAwesomeIcon icon={faSquare} />
                                        {event.description_3}</Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography variant="body2">
                                        <FontAwesomeIcon icon={faSquare} />
                                        {event.description_4}</Typography>
                                </ListItem>       <ListItem>
                                    <Typography variant="body2">
                                        <FontAwesomeIcon icon={faSquare} />
                                        {event.description_5}</Typography>
                                </ListItem>
                            </List>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </Container>
    </Box>
);
