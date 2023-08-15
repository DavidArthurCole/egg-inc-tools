import ChickensRequiredCalculator from 'app/ChickensRequiredCalculator'
import EggLayRateCalculator from 'app/EggLayRateCalculator'
import BoostCalculator from 'app/BoostCalculator'

function App() {
  return (
    <div className="h-screen flex flex-col">
      <div className="mx-auto max-w-screen-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-4">
          <EggLayRateCalculator />
          <ChickensRequiredCalculator />
          <div className="col-span-1 md:col-span-2">
            <BoostCalculator />
          </div>

          <div className="col-span-1 md:col-span-2 mt-6 text-black dark:text-white text-opacity-40 text-xs text-center">
            Data, game logic, and images are all copyright &copy;{' '}
            <a href="http://auxbrain.com/">Auxbrain, Inc.</a> as part of their
            game Egg, Inc.
            <br />
            Note: this calculator uses conservative estimates that do not take
            into account continued farm growth and future research availability.
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
