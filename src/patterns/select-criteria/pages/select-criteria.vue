<script setup lang="ts">
import { ref, watch } from 'vue'
import { Pixel, css } from '@mekari/pixel3'
import SelectCriteria, { type SelectCriteriaGroupOptions } from '../components/SelectCriteria.vue'

const groupOptionsList: SelectCriteriaGroupOptions[] = [
  { id: 'branch', name: 'Branch' },
  { id: 'organization', name: 'Organization' },
  { id: 'job-position', name: 'Job position' },
  { id: 'job-level', name: 'Job level' },
  { id: 'employment-status', name: 'Employment status' },
  { id: 'sbu', name: 'SBU' },
]

async function setOptionsList(groupOptionsId: string): Promise<{ value: string, label: string }[]> {
  await new Promise(resolve => setTimeout(resolve, 2000))
  const data: Record<string, { value: string, label: string }[]> = {
    'branch': [
      { value: 'jakarta', label: 'Jakarta' },
      { value: 'bandung', label: 'Bandung' },
      { value: 'surabaya', label: 'Surabaya' },
      { value: 'medan', label: 'Medan' },
      { value: 'yogyakarta', label: 'Yogyakarta' },
      { value: 'semarang', label: 'Semarang' },
      { value: 'makassar', label: 'Makassar' },
      { value: 'bali', label: 'Bali' },
      { value: 'balikpapan', label: 'Balikpapan' },
      { value: 'padang', label: 'Padang' },
      { value: 'pontianak', label: 'Pontianak' },
      { value: 'pekanbaru', label: 'Pekanbaru' },
      { value: 'manado', label: 'Manado' },
      { value: 'palembang', label: 'Palembang' },
      { value: 'bengkulu', label: 'Bengkulu' },
    ],
    'organization': [
      { value: 'product', label: 'Product' },
      { value: 'front-of-house', label: 'Front of House' },
      { value: 'hr', label: 'HR' },
      { value: 'kitchen', label: 'Kitchen' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'operations', label: 'Operations' },
      { value: 'technology', label: 'Technology' },
    ],
    'job-position': [
      { value: 'designer', label: 'Designer' },
      { value: 'chef', label: 'Chef' },
      { value: 'junior-ob', label: 'Junior OB' },
      { value: 'senior-ob', label: 'Senior OB' },
      { value: 'cashier', label: 'Cashier' },
    ],
    'job-level': [
      { value: 'staff', label: 'Staff' },
      { value: 'manager', label: 'Manager' },
    ],
    'employment-status': [
      { value: 'contract', label: 'Contract' },
      { value: 'permanent', label: 'Permanent' },
    ],
    'sbu': [
      { value: 'heimdall', label: 'Heimdall' },
      { value: 'crusader', label: 'Crusader' },
      { value: 'cosmic', label: 'Cosmic' },
      { value: 'horsemen', label: 'Horsemen' },
      { value: 'rocker', label: 'Rocker' },
      { value: 'albus', label: 'Albus' },
      { value: 'everai-heroes', label: 'Everai Heroes' },
      { value: 'parsenn', label: 'Parsenn' },
    ],
  }
  return data[groupOptionsId] || []
}

const selectedOptions = ref<SelectCriteriaGroupOptions[]>([])

watch(selectedOptions, (newVal) => {
  console.log('Selected options:', newVal)
})
</script>

<template>
  <Pixel.div :class="css({ margin: '24px' })">
    <SelectCriteria
      v-model:selected="selectedOptions"
      :groupOptions="groupOptionsList"
      :setOptions="setOptionsList"
    />
  </Pixel.div>
</template>
