Copy pattern for a day (browser console):

```
copy(JSON.stringify({month: document.getElementById('fcMonth').innerText, days: Array.from(document.querySelectorAll('#monthly > div > div.col-sm-4')).map(d => d.innerText.match(/^(\w+) (?<dayOfMonth>\d+)\.(?: (?<emoji>[^\s]+))? (?<patternName>\w+\d{2})$/)).filter(Boolean).map(m => m.groups).reduce((arr, g) => { arr[g.dayOfMonth - 1] = {patternName: g.patternName, emoji: g.emoji}; return arr; }, [])}))
```
