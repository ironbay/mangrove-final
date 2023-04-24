import { createSignal, onCleanup, Switch, Match } from "solid-js"
import { styled } from "@macaron-css/solid"

const Button = styled("button", {
  base: {
    backgroundColor: "gainsboro",
    borderRadius: "9999px",
    fontSize: "13px",
    padding: "10px 15px",
    ":hover": {
      backgroundColor: "lightgray",
    },
  },
})

function App() {
  let interval: ReturnType<typeof setInterval> = null
  const [count, setCount] = createSignal(0)

  function startInterval() {
    interval = setInterval(() => setCount(count() + 1), 1000)
  }

  onCleanup(() => clearInterval(interval))

  return (
    <div>
      <Button onClick={startInterval}>button</Button>
      <div>count: {count()}</div>
      <Switch fallback={<div>nothing yet...</div>}>
        <Match when={count() < 5}>Less than 5</Match>
        <Match when={count() < 10}>Less than 10</Match>
        <Match when={count() < 15}>Less than 15</Match>
      </Switch>
    </div>
  )
}

export default App
