import { computed, Ref } from 'vue'
import { useField } from 'vee-validate'

export function useStringField({
  name,
  dynamicRule,
  initialValue,
  rule = 'required'
}: {
  dynamicRule?: Ref<string>
  initialValue?: string
  name: string
  rule?: string
}) {
  const validation = computed(() =>
    [rule, dynamicRule?.value].filter((rule) => rule).join('|')
  )

  return useField<string>(name, validation, {
    initialValue: (initialValue || '') as string
  })
}

export function useNumberField({
  name,
  dynamicRule,
  initialValue,
  rule = 'required'
}: {
  dynamicRule?: Ref<string>
  initialValue?: number
  name: string
  rule?: string
}) {
  const validation = computed(() =>
    [rule, dynamicRule?.value].filter((rule) => rule).join('|')
  )

  return useField<number>(name, validation, {
    initialValue: (initialValue || 0) as number
  })
}