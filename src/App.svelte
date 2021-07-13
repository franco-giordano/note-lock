<script lang="ts">
	import Button from '@smui/button';
	import SegmentedButton, { Segment } from '@smui/segmented-button';
	import Textfield from '@smui/textfield';
	// import { Label } from '@smui/common';
	import Snackbar, { Label } from '@smui/snackbar';
	import Paper, { Title, Content } from '@smui/paper';
	import { lockNote } from './functions/utils';
	import IconButton from '@smui/icon-button';

	let clipboardSnackbar;

	let noteValue: string = 'write your note <br> here!';
	let hintValue: string = '';
	let passwordValue: string = '';
	let result: string = '';
 
	let choicesBackground = ['beige', 'cadetblue', 'aquamarine', 'white', 'lightcyan', 'mistyrose'];
	let selectedBackground = 'aquamarine';

	function encrypt() {
		lockNote(noteValue, passwordValue, hintValue, selectedBackground).then(x => result = x);
	}

	function saveToClipboard() {
		navigator.clipboard.writeText(result).then(
			() => clipboardSnackbar.open(),
			(e) => alert("fail")
		);
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
		display: flex;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	* :global(Paper) {
		margin: 100px;
	}

	* :global(.message) {
		width: 60vw;
		height: 50vh;
		font-size: 3rem;
		color: #2b2b2b;
		font-style: oblique;
		text-align: center;
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	* :global(.paper) {
		margin: 10px;
		display: block;
	}
</style>

<main>
	<!-- svelte-ignore a11y-autofocus -->
	<Paper elevation={6} class="paper" style="background-color: {selectedBackground}; transition: background-color 100ms linear;">
		<div class="message" autofocus bind:innerHTML={noteValue} contenteditable="true"></div>
	</Paper>

	<Paper elevation={6} class="paper">
		<Title>Configure</Title>

		<Content>
			<Textfield bind:value={hintValue} label="hint"></Textfield>
			<Textfield bind:value={passwordValue} label="password" input$type="password"></Textfield>
			
			
			<Button variant="raised" on:click={encrypt}>
				lock!
			</Button>
			
			<div>
			<Label>Choose background color:</Label>
				<SegmentedButton segments={choicesBackground} let:segment singleSelect bind:selected={selectedBackground}>
				<!-- Note: the `segment` property is required! -->
				<Segment {segment}>
				  <Label>{segment}</Label>
				</Segment>
			</SegmentedButton>
			</div>
			
			<Textfield input$disabled="true" variant="filled" bind:value={result} label="Locked Note URL">
				<IconButton class="material-icons" slot="trailingIcon" on:click={saveToClipboard}>
					content_copy
				</IconButton>
			</Textfield>
		</Content>
	</Paper>

	<Snackbar bind:this={clipboardSnackbar}>
		<Label>Copied to clipboard!</Label>
	</Snackbar>
</main>
