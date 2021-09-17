<script>
    import Paper from "@smui/paper";
    import { Cell } from "@smui/layout-grid";

    export let customStyle = "";
    export let spanDevices = {};
</script>

<Cell spanDevices={spanDevices}>
    <Paper elevation={6} class="paper" style={customStyle}>
        <slot />
    </Paper>
</Cell>
