
<template>
    <div class="post">
        <div class="vote">
            <button class="up">▲</button>
            <div class="score">3</div>
            <button class="down">▼</button>
        </div>
        <div class="body">
            <div class="meta">
                <span class="community"><a href="#">rustSucks</a></span>
                •
                <span class="author">user: <a href="#">cplusplus4lyfe</a></span>
                •
                <span class="time">2 hours ago</span>
            </div>
            <h2 class="title">Rust sucks!!!!!</h2>
            <p class="text">Rust is the programming language equivalent of being micromanaged by an overzealous boss who doesn't trust you to do anything without five layers of bureaucracy. Every time you try to write what should be a simple function, the compiler slaps your hand like an angry schoolteacher yelling, "Lifetime annotations!" And heaven forbid you try to do something as daring as shared mutability—boom, welcome to the borrow checker’s dungeon. Yes, memory safety is important, but Rust achieves it by holding developers hostage with arcane syntax and hours of Stack Overflow searches just to move a variable. It’s like building a spaceship when you just needed a bike.</p>
            <div class="footer">💬 23 comments</div>
        </div>
    </div class="post">
</template>

<style scoped>

.post {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    gap: 16px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    transition: box-shadow 0.2s;
}

.post:hover {
    box-shadow: 0 4px 10px rgba(0,0,0,0.08);
}

.vote {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.2rem;
    color: #90caf9;
    width: 4%;
}

.vote .up, .vote .down {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    color: inherit;
}

.vote .up:hover, .vote .downvote:hover {
    color: #1976d2;
}

.vote .score {
    margin: 0 0;
    font-weight: 600;
    color: #333;
}

.post .body {
    flex: 1;
}

.post .body .meta {
    font-size: 0.85rem;
    color: #6b7280;
    margin-bottom: 6px;
}

.post .body .meta a {
    text-decoration: none;
    color: #2196f3;
}

.post .body .title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 6px;
    color: #111827;
}

.post .body .text {
    font-size: 1rem;
    color: #333;
    margin-bottom: 12px;
}

.post .body .footer {
    font-size: 0.9rem;
    color: #4b5563;
}

</style>