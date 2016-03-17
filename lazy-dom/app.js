/** @jsx LazyDOM.createElement */

var React = LazyDOM;

var DBMon = function (props) {
  return (
    <div>
      <table className="table table-striped latest-data">
        <tbody>
          {
            props.databases.map(function (database) {
              return (
                <tr>
                  <td className="dbname">
                    {database.dbname}
                  </td>
                  <td className="query-count">
                    <span className={database.lastSample.countClassName}>
                      {database.lastSample.nbQueries}
                    </span>
                  </td>
                    {
                      database.lastSample.topFiveQueries.map(function (query, index) {
                        return (
                          <td className={ "Query " + query.elapsedClassName}>
                            {query.formatElapsed}
                            <div className="popover left">
                              <div className="popover-content">{query.query}</div>
                              <div className="arrow" />
                            </div>
                          </td>
                        );
                      })
                    }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

var request;

function renderDBMon(state) {
  cancelAnimationFrame(request);

  request = requestAnimationFrame(function () {
    LazyDOM.render(<DBMon databases={state.databases} />, document.getElementById('dbmon'));
  });

  Monitoring.renderRate.ping();

  setTimeout(function () {
    renderDBMon({ databases: ENV.generateData().toArray() });
  }, ENV.timeout);
}

renderDBMon({ databases: [] });