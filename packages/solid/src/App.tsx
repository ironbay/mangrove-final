import {
  createSignal,
  onCleanup,
  type Component,
  Show,
  For,
  Switch,
  Match,
} from "solid-js"

function App() {
  let interval: ReturnType<typeof setInterval> = null
  const [count, setCount] = createSignal(0)

  function startInterval() {
    interval = setInterval(() => setCount(count() + 1), 1000)
  }

  onCleanup(() => clearInterval(interval))

  return (
    <div>
      <div>count: {count()}</div>
      <div onClick={startInterval}>start timer</div>
      <Switch fallback={<div>nothing yet...</div>}>
        <Match when={count() < 5}>Less than 5</Match>
        <Match when={count() < 10}>Less than 10</Match>
        <Match when={count() < 15}>Less than 15</Match>
      </Switch>
    </div>
  )
}

export default App
