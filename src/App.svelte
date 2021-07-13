<script lang="ts">
	import Button from '@smui/button';
	import Chip, { Set, Text, LeadingIcon } from '@smui/chips';
	import Textfield from '@smui/textfield';
	import Paper, { Title, Content } from '@smui/paper';
	import linklock from "./libs/link-lock-api";
	import urlpage from "./libs/url-pages-api";

	let noteValue: string = '';
	let hintValue: string = '';
	let passwordValue: string = '';
 
	let choices = ['Blue', 'Warm', 'Pale', 'Fire'];
	let selected = 'Morning';

	function encrypt(note: string, hint:string, password: string) {
		
	}
</script>

<svelte:head>
	<title>Note Lock</title>
	<link rel="stylesheet" href="https://unpkg.com/svelte-material-ui/bare.css" />
	<!-- Material Icons -->
	<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/icon?family=Material+Icons"
	/>
	<!-- Roboto -->
	<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
	/>
	<!-- Roboto Mono -->
	<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css?family=Roboto+Mono"
	/>
</svelte:head>

<style>
	main {
		max-height: 100vh;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	* :global(.note) {
		width: 100%;
		background: "red"
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	* :global(.message) {
		width: 60vw;
		height: 50vh;
		font-size: 3rem;
		color: #2b2b2b;
		font-style: oblique;
		text-align: center;
		margin: auto;
		padding-top: 10vh;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 10vh;
	}
</style>

<main>
	<!-- svelte-ignore a11y-autofocus -->
	<div contenteditable={true} class="message" autofocus></div>

	<Paper elevation={6}>
		<Title>Configure</Title>

		<Content>
			<Textfield bind:value={hintValue} label="hint"></Textfield>
			<Textfield bind:value={passwordValue} label="password" input$type="password"></Textfield>
			
			<Button  variant="raised">
				lock!
			</Button>
			
			<Set chips={choices} let:chip choice bind:selected>
				
				<Chip {chip}>
					<LeadingIcon class="material-icons">book</LeadingIcon>
					<Text>{chip}</Text>
			</Chip>
			</Set>
		</Content>
	</Paper>
</main>
