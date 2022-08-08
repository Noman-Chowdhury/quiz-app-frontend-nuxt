<template>
  <div>Dashboard</div>
</template>

<script>
export default {
  name: 'DashboardPage',
  middleware: ['auth', 'user'],
}
</script>
