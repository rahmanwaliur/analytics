require 'csv'
require 'json'

csv_file = File.join(File.dirname(__FILE__), 'data', 'crime_summary_2012_2013.csv')
json_file = File.join(File.dirname(__FILE__), 'data', 'crime.json')

crime_data = {}

CSV.foreach(csv_file, headers: false) do |row|
  community = row[0]
  next if community == nil || community == ""
  crime_data[community] ||= {'year_2012' => 0, 'year_2013' => 0}

  category = row[1]
  crime_data[community]['year_2012'] += row[2..13].compact.map(&:to_i).reduce(:+) || 0
  crime_data[community]['year_2013'] += row[14..-1].compact.map(&:to_i).reduce(:+) || 0

  # crime_data[community] << {"category" => category, "2012" => year_2012_total, "2013" => year_2013_total}
end


File.open(json_file, 'w') do |file|
  file.write(JSON.pretty_generate(crime_data))
end

