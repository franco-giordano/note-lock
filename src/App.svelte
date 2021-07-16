<script lang="ts">
	import Button from '@smui/button';
	import Select, { Option } from '@smui/select';
	import Textfield from '@smui/textfield';
	// import { Label } from '@smui/common';
	import Snackbar, { Label } from '@smui/snackbar';
	import Paper, { Title, Content } from '@smui/paper';
	import { lockNote } from './functions/utils';
	import IconButton from '@smui/icon-button';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Dialog, { Title as TitleDialog,  Content as ContentDialog, Actions } from '@smui/dialog';

	let open;

	let clipboardSnackbar;

	let noteValue: string = 'write your note <br> here!';
	let hintValue: string = '';
	let passwordValue: string = '';
	let result: string = '';
 
	let choicesBackground = ['beige', 'cadetblue', 'aquamarine', 'white', 'lightcyan', 'mistyrose'];
	let selectedBackground = 'aquamarine';

	function encrypt() {
		lockNote(noteValue, passwordValue, hintValue, selectedBackground).then(x => result = x);
		open = true;
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
	/* main {
		display: flex;
		padding: 1em;
		max-width: none;
		margin: 0 auto;
	} */

	* :global(.paper) {
		/* width: 33vw; */
		height: 80vh;
		/* display: flex */
	}

	@media screen and (max-width: 840px) {
		main {
			max-width: none;
		}

		* :global(.paper) {
			/* width: 33vw; */
			height: 50vh;
			/* display: flex */
		}
	}

	* :global(.message) {
		width: 100%;
		height: 100%;
		font-size: 3rem;
		color: #2b2b2b;
		font-style: oblique;
		text-align: center;
		/* margin: auto; */
		/* display: flex; */
		overflow: hidden;
		justify-content: center;
		align-items: center;
	}
</style>

<main>
	<!-- svelte-ignore a11y-autofocus -->
	<LayoutGrid>
		
	<Cell spanDevices={{ desktop: 8, tablet: 12, phone: 12 }}>
	<Paper elevation={6} class="paper" style="background-color: {selectedBackground}; transition: background-color 100ms linear;">
		<div class="message" autofocus bind:innerHTML={noteValue} contenteditable="true"></div>
	</Paper>
	</Cell>

	<Cell spanDevices={{ desktop: 4, tablet: 12, phone: 12 }}>
	<Paper elevation={6} class="paper">
		<Title>Configure</Title>

		<Content>
			<Textfield bind:value={hintValue} label="hint"></Textfield>
			<Textfield bind:value={passwordValue} label="password" input$type="password"></Textfield>
			
			<div>
			<Label>Choose background color:</Label>
			<Select variant="outlined" bind:value={selectedBackground} label="Background color">
				{#each choicesBackground as oneBg}
				  <Option value={oneBg}>{oneBg}</Option>
				{/each}
			</Select>
			</div>
			
			<!-- <Textfield input$disabled="true" variant="filled" bind:value={result} label="Locked Note URL">
				<IconButton class="material-icons" slot="trailingIcon" on:click={saveToClipboard}>
					content_copy
				</IconButton>
			</Textfield> -->

			<Button variant="raised" on:click={encrypt}>
				lock!
			</Button>
		</Content>
	</Paper>
	</Cell>
	</LayoutGrid>

	<Snackbar bind:this={clipboardSnackbar}>
		<Label>Copied to clipboard!</Label>
	</Snackbar>
</main>

<Dialog
  bind:open
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
>
  <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
  <TitleDialog id="simple-title">Dialog Title</TitleDialog>
  <ContentDialog id="simple-content">Super awesome dialog body text?
	<Textfield input$disabled="true" variant="filled" bind:value={result} label="Locked Note URL">
		<IconButton class="material-icons" slot="trailingIcon" on:click={saveToClipboard}>
			content_copy
		</IconButton>
	</Textfield>
  </ContentDialog>
  <Actions>
    <Button on:click={() => {}}>
      <Label>No</Label>
    </Button>
    <Button on:click={() => {}}>
      <Label>Yes</Label>
    </Button>
  </Actions>
</Dialog>