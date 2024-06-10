<template>
    <div>
        <p>{{ formattedTime }}</p>
    </div>
</template>

<script>
	export default {
		data() {
			return {
				totalSeconds: 0,
				interval: null
			};
		},
		computed: {
			formattedTime() {
				const hours = Math.floor(this.totalSeconds / 3600)
					.toString()
					.padStart(2, '0');
				const minutes = Math.floor((this.totalSeconds % 3600) / 60)
					.toString()
					.padStart(2, '0');
				const seconds = (this.totalSeconds % 60)
					.toString()
					.padStart(2, '0');
				return `${minutes}:${seconds}`;
			}
		},
		mounted() {
			this.startTimer();
		},
		methods: {
			startTimer() {
				this.interval = setInterval(() => {
					this.totalSeconds++;
				}, 1000);
			},
			stopTimer() {
				clearInterval(this.interval);
			}
		}
	};
</script>
