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

export default function StreamButtons() {
  const { loading, error, data } = useQuery(ALL_PERFORMANCE_LINKS_QUERY);
  if (error)
    return <div>Error loading buttons.</div>;
  if (loading)
    return <div>Loading</div>;
  return (
    <ul>
      <li><a href=""></a></li>
    </ul>
  );
}