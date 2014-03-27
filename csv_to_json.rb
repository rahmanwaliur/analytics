require 'csv'
require 'json'

csv_files = File.join(File.dirname(__FILE__), 'data', 'CENSUS_COMMUNITY_DIST_2011.csv')
json_file = File.join(File.dirname(__FILE__), 'data', 'dwells.js')


pupulation_data = {}

Dir.glob(csv_files).each do |csv_file|

  year = File.basename(csv_file)[-8..-5]
  CSV.foreach(csv_file, headers: true) do |row|
    community = row['NAME']
    pupulation_data[community] = {total: row['DWELL_CNT'].to_i, own: row['OWNSHP_CNT'].to_i}
  end

end

File.open(json_file, 'w') do |file|
  file.write(JSON.pretty_generate(pupulation_data))
end

