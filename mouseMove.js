let draggable = document.querySelectorAll('.input-box');
let handleMouseMove = (e) => {
    let target = e.target;
    if (target.classList.contains('absolute')) {
        target.style.top = event.pageY + 'px';
    }
};

draggable.forEach(function(item) {
    item.addEventListener('mousedown', function(e) {
        item.style.top = event.pageY + 'px';
        item.classList.add('absolute');
        document.addEventListener('mousemove', handleMouseMove);
    });

    item.addEventListener('mouseup', function() {
        document.removeEventListener('mousemove', handleMouseMove);

        let sortedDraggables = Array.from(draggable).sort((a, b) => {
            let first = a.getBoundingClientRect().top;
            let second = b.getBoundingClientRect().top;
            return first > second ? 1 : -1;
        });

        item.classList.remove('absolute');

        let container = document.querySelector('section');

        container.innerHTML = '';

        sortedDraggables.forEach(function(element) {
            container.append(element);
        });
    });
});