export default function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<any>>) {
  setState((prev: any) => ({
    ...prev,
    [e.target.name]: e.target.value

  }))
}