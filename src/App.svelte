<script lang="ts">
	import Button from "@smui/button";
	import Select, { Option } from "@smui/select";
	import Textfield from "@smui/textfield";
	// import { Label } from '@smui/common';
	import Snackbar, { Label } from "@smui/snackbar";
	import Paper, { Title, Content } from "@smui/paper";
	import { lockNote } from "./functions/utils";
	import IconButton from "@smui/icon-button";
	import LayoutGrid, { Cell } from "@smui/layout-grid";
	import Dialog, {
		Title as TitleDialog,
		Content as ContentDialog,
		Actions,
	} from "@smui/dialog";
	import Icon from "@smui/textfield/icon";
	import HelperText from "@smui/textfield/helper-text/index";
	import TopAppBar, {
		Row,
		Section,
		Title as AppBarTitle,
	} from "@smui/top-app-bar";

	let open;

	let clipboardSnackbar;

	let noteValue: string = "write your note <br> here!";
	let hintValue: string = "";
	let passwordValue: string = "";
	let result: string = "";

	let choicesBackground = [
		"beige",
		"cadetblue",
		"aquamarine",
		"white",
		"lightcyan",
		"mistyrose",
	];
	let selectedBackground = "aquamarine";

	function encrypt() {
		lockNote(noteValue, passwordValue, hintValue, selectedBackground).then(
			(x) => (result = x)
		);
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
	<link
		rel="stylesheet"
		href="https://unpkg.com/svelte-material-ui/bare.css"
	/>
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
<TopAppBar variant="static">
	<Row>
		<Section>
			<AppBarTitle>Note Lock</AppBarTitle>
		</Section>
		<Section align="end" toolbar style="margin-top: 8px;">
			<IconButton
				class="material-icons"
				aria-label="Information"
				disabled
			>
				info
			</IconButton>
		</Section>
	</Row>
</TopAppBar>

<main>
	<!-- svelte-ignore a11y-autofocus -->
	<LayoutGrid>
		<Cell spanDevices={{ desktop: 8, tablet: 12, phone: 12 }}>
			<Paper
				elevation={6}
				class="paper"
				style="background-color: {selectedBackground}; transition: background-color 100ms linear;"
			>
				<div
					class="message"
					autofocus
					bind:innerHTML={noteValue}
					contenteditable="true"
				/>
			</Paper>
		</Cell>

		<Cell spanDevices={{ desktop: 4, tablet: 12, phone: 12 }}>
			<Paper elevation={6} class="paper">
				<Title>Configure</Title>

				<LayoutGrid>
					<Cell span={12}>
						<Textfield
							bind:value={hintValue}
							class="full-width"
							label="Hint"
						>
							<Icon class="material-icons" slot="leadingIcon"
								>lightbulb</Icon
							>
							<HelperText slot="helper"
								>This hint will appear next to the password
								prompt</HelperText
							>
						</Textfield>
					</Cell>
					<Cell span={12}
						><Textfield
							class="full-width"
							bind:value={passwordValue}
							required
							label="Password"
							input$type="password"
						>
							<Icon class="material-icons" slot="leadingIcon"
								>vpn_key</Icon
							>
							<HelperText slot="helper"
								>The required password to unlock the note</HelperText
							></Textfield
						>
					</Cell>

					<Cell span={12}>
						<Select
							variant="outlined"
							bind:value={selectedBackground}
							label="Background color"
							class="full-width"
						>
							{#each choicesBackground as oneBg}
								<Option value={oneBg}>{oneBg}</Option>
							{/each}
						</Select>
					</Cell>

					<Cell span={12}>
						<Button
							disabled={passwordValue === ""}
							class="full-width"
							variant="raised"
							on:click={encrypt}>lock!</Button
						>
					</Cell>
				</LayoutGrid>

				<!-- <Textfield input$disabled="true" variant="filled" bind:value={result} label="Locked Note URL">
				<IconButton class="material-icons" slot="trailingIcon" on:click={saveToClipboard}>
					content_copy
				</IconButton>
			</Textfield> -->
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
	<TitleDialog id="simple-title">Note Lock created</TitleDialog>
	<ContentDialog id="simple-content">
		{hintValue
			? `When using the link below, a prompt will appear with the following hint: ${hintValue}`
			: ""}
		<div>
			Share your locked link:
			<Textfield
				input$disabled="true"
				variant="filled"
				bind:value={result}
				label="Locked Note URL"
				class="full-width"
			>
				<IconButton
					class="material-icons"
					slot="trailingIcon"
					on:click={saveToClipboard}
				>
					content_copy
				</IconButton>
			</Textfield>
		</div>
	</ContentDialog>
	<Actions>
		<Button on:click={() => {}}>
			<Label>Close</Label>
		</Button>
	</Actions>
</Dialog>

<style>
	/* main {
		display: flex;
		padding: 1em;
		max-width: none;
		margin: 0 auto;
	} */

	* :global(.paper) {
		/* width: 33vw; */
		height: 75vh;
		/* display: flex */
	}

	* :global(.full-width) {
		width: 100%;
	}

	@media screen and (max-width: 840px) {
		main {
			max-width: none;
		}

		* :global(.paper) {
			/* width: 33vw; */
			height: 55vh;
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
		overflow-x: hidden;
		justify-content: center;
		align-items: center;
	}

	* :global(.top-app-bar-container) {
		max-width: 480px;
		width: 100%;
		height: 320px;
		border: 1px solid
			var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
		margin: 0 18px 18px 0;
		background-color: var(--mdc-theme-background, #fff);

		overflow: auto;
		display: inline-block;
	}
</style>
