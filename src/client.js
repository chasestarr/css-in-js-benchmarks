// references https://github.com/paularmstrong/react-component-benchmark-example

import * as React from "react";
import ReactDOM from "react-dom";
import Benchmark from "react-component-benchmark";
import benchmarks, { BenchmarkType } from "./benchmarks.js";

function Client() {
  const benchmarkRef = React.createRef();
  const [benchmarkType, setBenchmarkType] = React.useState(BenchmarkType.MOUNT);
  const [library, setLibrary] = React.useState(Object.keys(benchmarks)[0]);
  const [running, setRunning] = React.useState(false);
  const [results, setResults] = React.useState([]);

  function handleStart() {
    setRunning(true);
    benchmarkRef.current.start();
  }

  function handleComplete(result) {
    setResults([{ ...result, benchmarkType, library }, ...results]);
    setRunning(false);
  }

  const { Component, Provider, componentProps } = React.useMemo(() => {
    return benchmarks[library][benchmarkType];
  }, [library, benchmarkType]);

  return (
    <div style={{ display: "flex", fontFamily: "sans-serif", height: "100vh" }}>
      <div style={{ width: "600px" }}>
        <form>
          <label>
            Library
            <select
              id="library"
              style={{ width: "100%" }}
              disabled={running}
              onChange={(event) => setLibrary(event.target.value)}
            >
              {Object.keys(benchmarks).map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </label>

          <label>
            Benchmark Type
            <select
              id="benchmark-type"
              style={{ width: "100%" }}
              disabled={running}
              onChange={(event) => setBenchmarkType(event.target.value)}
            >
              {Object.values(BenchmarkType).map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </label>

          <button disabled={running} onClick={handleStart}>
            start
          </button>
        </form>

        <ul
          style={{
            listStyle: "none",
            marginBlockStart: 0,
            paddingInlineStart: 0,
          }}
        >
          {results.map((result, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "solid 1px #d8dbe3",
                marginBottom: "12px",
              }}
            >
              <div data-test-id="result" style={{ fontSize: "14px" }}>
                {result.library} - {result.benchmarkType}
              </div>
              <table>
                <tbody style={{ fontSize: "12px" }}>
                  <tr>
                    <td>mean</td>
                    <td data-test-id="mean">{result.mean.toFixed(3)}ms</td>
                  </tr>
                  <tr>
                    <td>std dev</td>
                    <td data-test-id="stddev">{result.stdDev.toFixed(3)}ms</td>
                  </tr>
                  <tr>
                    <td>p95</td>
                    <td data-test-id="p95">{result.p95.toFixed(3)}ms</td>
                  </tr>
                  <tr>
                    <td>p99</td>
                    <td data-test-id="p99">{result.p99.toFixed(3)}ms</td>
                  </tr>
                </tbody>
              </table>
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Provider>
          <Benchmark
            key={`${benchmarkType}-${library}`}
            component={Component}
            componentProps={componentProps}
            onComplete={handleComplete}
            ref={benchmarkRef}
            samples={100}
            timeout={10000}
            type={
              benchmarkType === BenchmarkType.UPDATE
                ? BenchmarkType.UPDATE
                : BenchmarkType.MOUNT
            }
          />
          {!running && <Component {...componentProps} />}
        </Provider>
      </div>
    </div>
  );
}

const root = document.getElementById("root");
ReactDOM.render(<Client />, root);
