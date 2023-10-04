<script lang="ts">
	import Background from '@/components/Background.vue'

	export default {
  		components: { Background },
		props: ['code', 'message']
	}
</script>

<template>
	<div class="error-page">
		<div class="error-text">
			<div class="code">{{ code }}</div>
			<div class="message">{{ message }}</div>
		</div>
	</div>
</template>

<style scoped>
	.error-page {
		display: flex;
		justify-content: center;
		align-items: center;
		height: calc(100vh - 80px);
	}

	.error-text {
		display: flex;
	}

	.code, .message {
		color: var(--color-white);
		padding: 10px 20px;
		font-size: 35px;
	}

	.code {
		border-right: 2px solid var(--color-white);
	}
</style>
