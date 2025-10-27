
<template>
    <div class="sidebar">
        <div class="sidebar-list">
            <span class="title">Communities</span>
            <a href="#">rustSucks</a>
            <a href="#">rust_cult</a>
            <a href="#">programming</a>
        </div>
    </div class="sidebar">
</template>

<style scoped>
.sidebar {
    background: #ffffff;
    padding: 16px;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
    height: fit-content;
}

.sidebar-list {
    margin-bottom: 18px;
}

.sidebar-list .title {
    font-size: 0.85rem;
    font-weight: 600;
    color: #6b7280;
    margin-bottom: 8px;
    display: block;
}

.sidebar a {
    display: block;
    padding: 10px 12px;
    border-radius: 6px;
    text-decoration: none;
    color: #1a1a1a;
    transition: background 0.2s;
}

.sidebar a:hover {
    background: #e3f2fd;
    color: #1976d2;
}
</style>