# Dead simple emoji picker

[See demo here](https://lab.jeremyblaze.com/emoji-picker)

To use it simply include this in your code (also make sure jQuery is installed)...

```
<link rel="stylesheet" type="text/css" href="jquery.jb-emoji.css" />
<script type="text/javascript" src="jquery.jb-emoji.js"></script>
<script type="text/javascript">

    $(document).ready(function(){
        $('.jb-emoji').jbEmoji(function(){
            // do things when active emoji changes
        });
    });

</script>
```

Then add this wherever you want a picker...

```
<div class="jb-emoji" data-active-emoji-unicode="" data-active-emoji-html=""></div>
```

The `data-active-emoji-unicode` and `data-active-emoji-html` attributes will be updated automatically to the data for the active emoji. Integration is up to you – but if you just check those attributes attribute it should be easy.

***

## Credits

- the emoji data is from https://gist.github.com/oliveratgithub/0bf11a9aff0d6da7b46f1490f86a71eb