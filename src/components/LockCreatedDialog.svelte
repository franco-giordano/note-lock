<script>
    import Dialog, { Actions } from "@smui/dialog";
    import Button, { Icon } from "@smui/button";
    import { Label } from "@smui/common";

    export let openBind = false;
    export let longUrl = '';

    const setLongNoteUrl = () => {
        document.getElementById("url").value = longUrl;
    }
</script>

<Dialog
    bind:open={openBind}
    aria-labelledby="title-dialog"
    aria-describedby="content-dialog"
>
    <slot />
    <Actions>
        <form
            action="https://tinyurl.com/create.php"
            method="post"
            target="_blank"
            id="uploadform"
        >
            <input type="hidden" id="source" name="source" value="indexpage" />
            <input type="hidden" name="url" id="url" />
        </form>
        <Button on:click={setLongNoteUrl} form="uploadform">
            <Label>Get Shortened Link</Label>
            <Icon class="material-icons">open_in_new</Icon>
        </Button>
            <Button on:click={() => {}}>
            <Label>Close</Label>
        </Button>
    </Actions>
</Dialog>
