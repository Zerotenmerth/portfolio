javascript:(/* @version 2.2 @author Golden_Dragon @description only for site Mangalib.me*/function() 
{
	let maxLengthPage = Math.max(
	  document.body.scrollHeight, document.documentElement.scrollHeight,
	  document.body.offsetHeight, document.documentElement.offsetHeight,
	  document.body.clientHeight, document.documentElement.clientHeight
	);
	let step = 150;
	let index = Math.floor(maxLengthPage / step);

	for(let j=0; j<index; j++)
	{
		setTimeout(function()
		{
			let mass = document.getElementsByClassName('media-chapter__icon media-chapter__icon_download tooltip');
			for(let i=0; i<mass.length; i++)
			{
			 mass[i].click(); 
			}
			window.scrollBy(0,step);
		}, 3000);
	}
})()