import { gql, useQuery } from "@apollo/client";

export const UPCOMING_EVENTS_QUERY = gql`
  query UpcomingEvents {
    events {
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

export default function StreamLinks() {
  const { loading, error, data } = useQuery(UPCOMING_EVENTS_QUERY);
  if (error) console.log(error);
  if (loading)
    return <img src="/loading.svg" alt="Loading" width="25px" height="25px" />;
  if (data) {
    const events = data.products.edges;
    const dateOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'PST',
      timeZoneName: 'short'
    }
    return (
      <ul className="upcoming_events">
        {events.map((event, index) => (
          <li key={`${index}_${event.linkUrl}_${event.linkText}`} className="upcoming_event">
            <a href={"https://ghostlightplayhouse.com" + event.linkUrl} target="blank">
              {event.stateDate.toLocaleDateString('en-US', dateOptions)}: {event.title}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}
