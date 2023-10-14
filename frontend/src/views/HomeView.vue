<script lang="ts">
    import CustomButton from '../components/CustomButton.vue';

	export default {
        components: { CustomButton },
        data() {
            return {
                articles: [
                    {
                        title: "Standard Chess",
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
						path: "/play",
                        image: "/assets/image/chessboard.jpg",
						imageClass: "image-class-1"
                    },
                    {
                        title: "Learn",
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
						path: "/learn",
						image: "/assets/image/chess-hogwarts.png",
                        imageClass: "image-class-2"
                    },
                    {
                        title: "Fischer Random Chess",
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
						path: "/play/960",
                        image: "/assets/image/chess.png"
                    },
                    {
                        title: "Fog of War",
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
						path: "/play/fog",
                        image: "/assets/image/chess-fog.jpg"
                    },
                    {
                        title: "Four-player Chess",
                        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
						path: "/play/4player",
						image: "/assets/image/chess.png"
                    }
                ]
            };
        }
	}
</script>

<template>
	<div class="learn">
		<article v-for="(article, index) in articles" :key="index">
            <div class="section">
                <div class="text">
                    <div class="title">{{ article.title }}</div>
                    <div class="description">{{ article.text }}</div>
                    <div style="display: flex;">
						<router-link :to="article.path">
                        	<CustomButton text="Try it out now" />
						</router-link>
                    </div>
                </div>
            </div>
            <div class="section">
                <img :class="['image', article.imageClass ?? '']" :src="article.image" alt="image" />
            </div>
        </article>
	</div>
</template>

<style scoped>
    .learn {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

	article {
        width: 85vw;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        gap: 60px;
    }

	@media screen and (min-width: 1000px) {
        article:nth-child(2n+1) {
			flex-direction: row;
		}

		article:nth-child(2n) {
			flex-direction: row-reverse;
		}
    }

    @media screen and (max-width: 999px) {
        .learn {
            margin-block: 60px;
            gap: 60px;
        }

        article {
            flex-direction: column;
        }
    }

    .section {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .text {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }

    .image {
        width: min(100%, 520px);
    }

	.image-class-1 {
		border-radius: 50%;
		box-shadow: 0 0 10px 10px rgba(255, 255, 255, 0.3);
	}

    .image-class-2 {
		border-radius: 50%;
	}

    .title {
        font-size: 50px;
    }

    .description {
        color: var(--color-gray);
        font-size: 18px;
    }
</style>
