import { gql, useQuery } from "@apollo/client";

export const UPCOMING_EVENTS_QUERY = gql`
  query UpcomingEvents {
    events (first: 3, where: {orderby: {field: DATE, order: ASC}}) {
      edges {
        node {
          id
          startDate
          title
          uri
        }
      }
    }
  }
`;

export default function UpcomingEvents() {
  const { loading, error, data } = useQuery(UPCOMING_EVENTS_QUERY);
  if (error) console.log(error);
  if (loading)
    return <img src="/loading.svg" alt="Loading" width="25px" height="25px" />;
  if (data) {
    const events = data.events.edges;
    const dateOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }
    console.log(events.length);
    if (events.length > 0) {
      return (
        <figure className="upcoming-events">
          <h2>Upcoming Events</h2>
          <ul className="event-list">
            {events.map((event) => {
              let eventDate: Date = new Date(Date.parse(event.node.startDate));
              return(
                <li key={event.node.id} className="upcoming_event">
                  <a href={"https://ghostlightplayhouse.com" + event.node.uri} target="_blank">
                    {eventDate.toLocaleDateString('en-US', dateOptions)}: {event.node.title}
                  </a>
                </li>
              )
            })}
          </ul>
        </figure>
      )
    }
    else {
      return (
      <figure className="upcoming-events">
        <h2>More events coming soon</h2>
        <a href="https://www.facebook.com/GhostlightPlayhouse">Follow us on Facebook to stay in the loop!</a>
      </figure>
      );
    }
  }
}
