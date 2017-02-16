# Emerson Hum Geo-challenge

## How It Works
The code runs the following steps to find the closest store:

1. Code reads store-locations.csv and saves to local memory as store list
2. User enters in any address to command line prompt
3. Google Maps API and node-geocoder library converts any search query into a location
4. Node-geocoder library queries Google Maps for relevant location info
5. Code then takes location coordinates and filters store list for stores within +/- 0.25 deg
6. Code then compares user location to location of the filtered stores with Haversine formula and returns the closest
7. Results given to user, user can choose to see more details, search again, or terminate application

I assumed comparing the user location to all 1700+ stores would take too long because the distance calculator was 
time-intensive so I roughly filtered out the stores before comparing them to the user location (see step 5). 
This left me with about 15-20 stores to then calculate the actual distance from the user location. A caveat of this approach is that 
if you enter an address not in the US, like London England, you won't find any store. This assumes you know all the stores are somewhere 
in the US and wouldn't need to search locations outside of the US. The test I wrote confirms this assumption that the filtering 
the store list then comparing each one would be faster than comparing the user location to all 1700+ locations. But the 
time savings were overshadowed by the time it takes to make the API call.

To get back some time on the API call, I added the ability to memoize the user inputs. So if you search 'NYC' consecutively, 
(you skip from step 2 to 7) you'll see more than 200ms are saved. An obvious downside is that this takes up more local memory 
and is lost when you exit out of the search.

## Running Instructions

### First Time Running Instructions
Update geocoder.js file with personal Google Maps API key

From within the root directory:

```sh
npm install
node geo-challenge.js
```
### Every Other Time
From within the root directory:

```sh
node geo-challenge.js
```

## Testing Instructions

From within the root directory:

```sh
npm test
```


# Coding Challenge Instructions

## Coding challenge

In this repo there is store-locations.csv

This is a tabular dataset of the locations of every store of a major national retail chain.

## Deliverables

Please download the file (rather than forking this repo), do the exercise, and then upload to your own repo.

Then, write a script or application that, given a reasonably well-formed address string like:

*"1770 Union St, San Francisco, CA 94123"*

Returns the address of the geographically closest store from the dataset.

Additionally:

- Please write up a paragraph or two about how your solution works, any assumptions you made, or caveats about your implementation, and put it in a readme file.
- Please write at **least one unit or integration test** that asserts something meaningful about the program. One good test is better than a bunch of mediocre tests.

Send me a github link to the final project.

## Notes

Feel free to do this in whatever language you would like, and focus on the problem itself; the way data gets input into the program is not important. Command line, GUI application, or even editing an obvious variable at the top of a file. Whatever. As long as it's reasonably easy for me to run your code and there are clear instructions for doing so.

You might need to use external APIs or services to get a working solution. That's fine. Also fine to make it work entirely offline. To the extent you need any algorithms, I'm not expecting you to reinvent anything from scratch, so use Google judiciously, as well as any libraries you find.

You can add polish if you'd like, but remember that software is about tradeoffs and *by far the most important thing is delivering working, practical software that solves the problem of finding the closest store location*. The goal is not to take up a bunch of your time, but see you solve a problem that looks very much like the type of work we do all the time.

There are a ton of different ways to skin this cat -- be smart, be practical, thanks, and good luck!
