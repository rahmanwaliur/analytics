require 'json'

# url_root = 'http://www.calgary.ca/_layouts/cocis/DirectDownload.aspx?&noredirect=1&sf=1&target=http%3a%2f%2fwww.calgary.ca%2fCSPS%2fCNS%2fDocuments%2fcommunity_social_statistics%2f'
# files = ["abbeydale.pdf" ,"macewan_glen.pdf" ,"acadia.pdf" ,"manchester.pdf" ,"albert_park_radisson_heights.pdf" ,"maple_ridge.pdf" ,"altadore.pdf" ,"marlborough_park.pdf" ,"applewood_park.pdf" ,"marlborough.pdf" ,"arbour_lake.pdf" ,"martindale.pdf" ,"aspen_woods.pdf" ,"mayfair.pdf" ,"auburn_bay.pdf" ,"mayland_heights.pdf" ,"mckenzie_lake.pdf" ,"banff_trail.pdf" ,"mckenzie_towne.pdf" ,"bankview.pdf" ,"meadowlark_park.pdf" ,"bayview.pdf" ,"midnapore.pdf" ,"beddington_heights.pdf" ,"millrise.pdf" ,"bel_aire.pdf" ,"mission.pdf" ,"beltline.pdf" ,"monterey_park.pdf" ,"bonavista_downs.pdf" ,"montgomery.pdf" ,"bowness.pdf" ,"mount_pleasant.pdf" ,"braeside.pdf" ,"mount_royal_lower.pdf" ,"brentwood.pdf" ,"bridgeland_riverside.pdf" ,"new_brighton.pdf" ,"bridlewood.pdf" ,"north_glenmore_park.pdf" ,"britannia.pdf" ,"north_haven_upper.pdf" ,"north_haven.pdf" ,"cambrian_heights.pdf" ,"canyon_meadows.pdf" ,"oakridge.pdf" ,"capitol_hill.pdf" ,"ogden.pdf" ,"castleridge.pdf" ,"cedarbrae.pdf" ,"palliser.pdf" ,"cfb_lincoln_park_pmq.pdf" ,"panorama_hills.pdf" ,"chaparral.pdf" ,"parkdale.pdf" ,"charleswood.pdf" ,"parkhill.pdf" ,"chinatown.pdf" ,"parkland.pdf" ,"chinook_park.pdf" ,"patterson_heights.pdf" ,"christie_park.pdf" ,"penbrooke_meadows.pdf" ,"citadel.pdf" ,"pineridge.pdf" ,"cliff_bungalow.pdf" ,"point_mckay.pdf" ,"coach_hill.pdf" ,"pump_hill.pdf" ,"collingwood.pdf" ,"copperfield.pdf" ,"coach_hill.pdf" ,"queens_park_village.pdf" ,"coral_springs.pdf" ,"collingwood.pdf" ,"queensland.pdf" ,"cougar_ridge.pdf" ,"country_hills.pdf" ,"ramsay.pdf" ,"country_hills_village.pdf" ,"ranchlands.pdf" ,"coventry_hills.pdf" ,"red_carpet_mountview_mobile_park.pdf" ,"cranston.pdf" ,"renfrew.pdf" ,"crescent_heights.pdf" ,"richmond.pdf" ,"crestmont.pdf" ,"rideau_park.pdf" ,"riverbend.pdf" ,"dalhousie.pdf" ,"rocky_ridge.pdf" ,"deer_ridge.pdf" ,"rosedale.pdf" ,"deer_run.pdf" ,"rosemont.pdf" ,"diamond_cove.pdf" ,"rosscarrock.pdf" ,"discovery_ridge.pdf" ,"roxboro.pdf" ,"douglasdale_glen.pdf" ,"royal_oak.pdf" ,"dover.pdf" ,"rundle.pdf" ,"downtown_east_village.pdf" ,"rutland_park.pdf" ,"downtown_west_end.pdf" ,"downtown_commercial_core.pdf" ,"saddle_ridge.pdf" ,"sage_hill.pdf" ,"eagle_ridge.pdf" ,"sandstone_valley.pdf" ,"eau_claire.pdf" ,"downtown_commercial_core.pdf" ,"scarboro.pdf" ,"edgemont.pdf" ,"scarboro_sunalta_west.pdf" ,"elbow_park.pdf" ,"scenic_acres.pdf" ,"elboya.pdf" ,"shaganappi.pdf" ,"erin_woods.pdf" ,"shawnee_slopes.pdf" ,"erlton.pdf" ,"shawnessy.pdf" ,"evanston.pdf" ,"shepard_industrial.pdf" ,"evergreen.pdf" ,"sherwood.pdf" ,"silverado.pdf" ,"fairview.pdf" ,"silver_springs.pdf" ,"falconridge.pdf" ,"signal_hill.pdf" ,"forest_heights.pdf" ,"somerset.pdf" ,"forest_lawn.pdf" ,"south_calgary.pdf" ,"forest_lawn_industrial.pdf" ,"southview.pdf" ,"glamorgan.pdf" ,"southwood.pdf" ,"glenbrook.pdf" ,"springbank_hill.pdf" ,"glendale.pdf" ,"spruce_cliff.pdf" ,"greenview.pdf" ,"st_andrews_heights.pdf" ,"greenwood_greenbriar.pdf" ,"strathcona_park.pdf" ,"sunalta.pdf" ,"hamptons.pdf" ,"sundance.pdf" ,"harvest_hills.pdf" ,"sunnyside.pdf" ,"hawkwood.pdf" ,"haysboro.pdf" ,"taradale.pdf" ,"hidden_valley.pdf" ,"temple.pdf" ,"taradale.pdf" ,"highland_park.pdf" ,"thorncliffe.pdf" ,"highwood.pdf" ,"tuscany.pdf" ,"hillhurst.pdf" ,"tuxedo_park.pdf" ,"hounsfield_heights_briar_hill.pdf" ,"huntington_hills.pdf" ,"university_heights.pdf" ,"inglewood.pdf" ,"hidden_valley.pdf" ,"university_of_calgary.pdf" ,"upper_mount_royal.pdf" ,"university_of_calgary.pdf" ,"kelvin_grove.pdf" ,"killarney_glengarry.pdf" ,"valley_ridge.pdf" ,"kingsland.pdf" ,"varsity.pdf" ,"vista_heights.pdf" ,"lake_bonavista.pdf" ,"lakeview.pdf" ,"westgate.pdf" ,"lincoln_park.pdf" ,"west_hillhurst.pdf" ,"lower_mount_royal.pdf" ,"west_springs.pdf" ,"killarney_glengarry.pdf" ,"whitehorn.pdf" ,"kingsland.pdf" ,"wildwood.pdf" ,"willow_park.pdf" ,"windsor_park.pdf" ,"winston_heights_mountview.pdf" ,"woodbine.pdf" ,"woodlands.pdf" ,"woodbine.pdf"]

# threads = []

# files.each_slice(20) do |slice|

#   threads << Thread.new do
#     slice.each do |file|
#       file_url = url_root + file

#       system("curl 'http://www.calgary.ca/_layouts/cocis/DirectDownload.aspx?&noredirect=1&sf=1&target=http%3a%2f%2fwww.calgary.ca%2fCSPS%2fCNS%2fDocuments%2fcommunity_social_statistics%2f#{file}' -H 'Accept-Encoding: gzip,deflate,sdch' -H 'Accept-Language: en-US,en;q=0.8,bn;q=0.6' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.102 Safari/537.36' -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' -H 'Cache-Control: max-age=0' -H 'Cookie: ISAWPLB{08FD7852-D551-4908-90E5-08C2B0749557}={077F32CD-D195-40C6-8FAD-C274C1BDC11A}; __gads=ID=2379eb3db7c32feb:T=1376425346:S=ALNI_MZNO2y9gfIC_QpCnSpDItmkRPorSQ; ISAWPLB{06554A9D-523A-40FA-9DEC-C5C482E65828}={523F7DBF-FC22-456F-BB43-543264553800}; fsr.s={\"v\":-2,\"cp\":{\"gsaQuery\":\"tax,arbour+lake,arbour+lake+profile\"},\"rid\":\"def5437-92347341-8ac7-cee2-ffdc7\",\"ru\":\"http://t.co/KNWMPpAj3I\",\"st\":\"\",\"to\":4.7,\"c\":\"http://www.calgary.ca/CSPS/CNS/Pages/Research-and-strategy/Community-profiles/Community-Profiles.aspx\",\"pv\":42,\"lc\":{\"d0\":{\"v\":42,\"s\":true}},\"cd\":0,\"sd\":0,\"f\":1392183466227}; _ga=GA1.2.43812924.1376425343; WT_FPC=id=206.132.234.6-3573119968.30316642:lv=1392188984456:ss=1392188984456; fsr.a=1392188985203' -H 'Connection: keep-alive' --compressed -o data/pdf/#{file}")
#     end
#   end

# end

# threads.each(&:join)

pdf_files = File.join(File.dirname(__FILE__), 'data', 'pdf', '*.pdf')
json_file = File.join(File.dirname(__FILE__), 'data', 'incomes.js')

income_data = {}

Dir.glob(pdf_files).each do |pdf_file|
  profile = `pdftohtml #{pdf_file} -f 2 -l 2 -i -noframes -stdout`
  profile = profile.encode('UTF-8', 'binary', invalid: :replace, undef: :replace, replace: '')
  incomes =  profile.scan(/\$\d+,\d+/m)[0..1].map{|income| income.delete("$").delete(",").to_i}

  community_name = File.basename(pdf_file)[0..-5].upcase.gsub("_", " ")

  income_data[community_name] = {year_2000: incomes[0], year_2005: incomes[1]}
end

File.open(json_file, 'w') do |file|
  file.write(JSON.pretty_generate(income_data))
end
