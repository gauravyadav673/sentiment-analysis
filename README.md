# sentiment-analysis
simple REST api for sentiment analysis.

#Post-request
https://highsents.herokuapp.com/analysis
hit a post request to above url with a key value pair in its body as follows.
key = "state", value = The statement you want to analyze.
it replies with a string ("positive", "negative" or "neutral")

#Get-request
###Example
http://highsents.herokuapp.com/analysis/?state=this%20is%20an%20awesome%20api
