import ModeSelect from '../ModeSelect'

function AppBar() {
  return (
    <div className="w-full h-(--header) bg-(--color-primary) flex items-center">
      <ModeSelect />
    </div>
  )
}

export default AppBar