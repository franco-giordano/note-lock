<script>
    import Dialog, { Actions } from "@smui/dialog";
    import Button from "@smui/button";
    import { Label } from "@smui/common";

    export let openBind = false;
</script>

<Dialog
    bind:open={openBind}
    aria-labelledby="title-dialog"
    aria-describedby="content-dialog"
>
    <slot/>
    <Actions>
        <Button on:click={() => {}}>
            <Label>Close</Label>
        </Button>
    </Actions>
</Dialog>
