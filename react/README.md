# React

## Pros
- Good Typescript support
- props are easily definable using typescript and there are no confusing fallthroughs
- directly write typescript in file no `<script>` needs to wrapped around

## Cons
- useState needs a setter function and can not be directly edited using functions like push
- you have to use functions like `cn` because className doesnt fall through