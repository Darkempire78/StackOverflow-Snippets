for (let i = document.getElementsByClassName('yuRUbf').length; i-- > 0;) {
	let link = document.getElementsByClassName('yuRUbf')[i].getElementsByTagName('a')[0]
	if (link.host == "stackoverflow.com" && link.pathname.startsWith('/questions/')) {
		let id = link.pathname.replace('/questions/', '')
		id = id.substr(0, id.indexOf('/'))

		let rescont = document.getElementsByClassName('IsZvec')[i]

		fetch(`https://api.stackexchange.com/2.2/questions/${id}/answers?order=desc&sort=votes&site=stackoverflow&filter=!b6AubVkmmBt14D`).then(data => {
			data = data.json()
			console.log(data)
			data.then(function(data) {
				if (data.quota_remaining > 0) {
					let otherlinks = ""
					for (let j = rescont.getElementsByTagName('div').length; j-- > 0;) {
						if (rescont.getElementsByTagName('div')[j].dataset.ved != undefined) {
							otherlinks = '<span class="cardInfo"><b>Related links</b></span>' + rescont.getElementsByTagName('div')[j].outerHTML
						}
					}
					ans = data.items[0]

					let type
					if (ans.is_accepted) {
						type = "Verified"
					} else {
						type = "Top"
					}
					let body = ans.body
					let score = ans.score

					rescont.innerHTML = `
						<div class="card">
							<div class="cardContent">
								<span class="cardInfo">${type} solution - Score: ${score}</span>
								<div class="cardAnswer">${body}</div>
							</div>
							<div class="otherLinks">${otherlinks}</div>
						</div>
						
					`
				} else {
					rescont.innerHTML = "<i>codesearch is rate-limited by StackOverflow's API. The limitation is reset every day.</i><br>" + rescont.innerHTML
				}
			})
		})
	}
}
