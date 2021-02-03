import { gql, useQuery } from "@apollo/client";

export const ALL_PERFORMANCE_LINKS_QUERY = gql`
  query PerformanceLinks {
    products {
      edges {
        node {
          performanceDetails {
            performanceLinks {
              linkText
              linkUrl
            }
            performanceDate
          }
        }
      }
    }
  }
`;

export default function StreamLinks() {
  const { loading, error, data } = useQuery(ALL_PERFORMANCE_LINKS_QUERY);
  const today = new Date().toLocaleDateString("en-US");
  if (error) console.log(error);
  if (loading)
    return <img src="/loading.svg" alt="Loading" width="25px" height="25px" />;
  if (data) {
    const performances = data.products.edges;
    let todayPerformances = [];
    performances.forEach((performance) => {
      let performanceDate = performance.node.performanceDetails;
      let performanceLinks =
        performance.node.performanceDetails.performanceLinks;
      if (performanceLinks) {
        todayPerformances = todayPerformances.concat(performanceLinks);
      }
    });
    return (
      <ul className="stream_links">
        {todayPerformances.map((link, index) => (
          <li key={`${index}_${link.linkUrl}_${link.linkText}`} className="stream_link">
            <a href={link.linkUrl} target="blank">
              {link.linkText}
            </a>
          </li>
        ))}
      </ul>
    );
  }
}
