import PersistentDecisionHallway from '@/app/models/PersistentDecisionHallway'
import ErrorCardContent from '@/app/components/ErrorCardContent'
import WinnerContent from './WinnerContent'

async function Winner({ params }) {
  const { id } = params

  let winnerOption
  try {
    winnerOption = await PersistentDecisionHallway.getWinnerOption(Number(id))
  } catch (error) {
    return (
      <ErrorCardContent>
        No hay opcion ganadora para esta sala.
        <br />
        Verifique su número de sala
      </ErrorCardContent>
    )
  }

  return (
    <WinnerContent
      winnerOption={winnerOption}
    />
  )
}

export default Winner
