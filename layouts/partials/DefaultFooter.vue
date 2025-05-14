<template>
    <footer class="custom-footer">
        <div class="d-grid container">
            <div>
                <span>©2025 ALL RIGHTS RESERVED</span>
            </div>
            <div>
                <span>TAIPEI / TAIWAN</span>
            </div>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
.custom-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    padding: $space-md;
    color: $color-text-tertiary;
    
    .container {
        grid-template-columns: 3fr 1fr;
    }
}
</style>
