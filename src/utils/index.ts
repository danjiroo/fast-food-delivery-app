export { usePersistentMachine } from './usePersistentMachine'
export { data } from './data'

export const capFirstLetterForEachWord = (str = ''): string =>
  str
    .toLowerCase()
    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())

interface Option {
  id: number
  name: string
}

export const formatSelectOptions = (options: string[] | Option[]) =>
  options?.map((option) => {
    console.log('typeof option', typeof option)
    if (typeof option == 'object') {
      console.log('IS OBJHECT', option)
      return {
        id: option.id,
        label: capFirstLetterForEachWord(option.name),
        value: option.name,
      }
    }

    return {
      label: capFirstLetterForEachWord(option),
      value: option,
    }
  }) ?? []
